async reschedule(id: string, dto: RescheduleMeetingDto) {
  const timezone = dto.timezone ?? 'America/Bogota';

  const meeting = await this.meetingRepository.findOne({
    where: { id },
    relations: ['user', 'trainingRequest'],
  });

  if (!meeting) {
    throw new NotFoundException('Reunión no encontrada');
  }

  const newStart = localToUTC(dto.date, dto.time, timezone);
  const now = new Date();

  const selectedDate = new Date(newStart);
  selectedDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    throw new BadRequestException(
      'No puedes reagendar reuniones en fechas pasadas',
    );
  }

  const minAllowedDate = new Date(now.getTime() + 30 * 60000);

  if (newStart <= minAllowedDate) {
    throw new BadRequestException(
      'La reunión debe reagendarse con al menos 30 minutos de anticipación',
    );
  }

  const day = getLocalDay(newStart, timezone);

  if (day === 0 || day === 6) {
    throw new BadRequestException(
      'No se permiten reuniones los fines de semana',
    );
  }

  const { hour, minutes } = getLocalHour(newStart, timezone);

  const invalidHour = hour < 9 || hour > 16 || (hour === 16 && minutes > 30);

  if (invalidHour) {
    throw new BadRequestException(
      'La reunión está fuera del horario laboral (9:00 - 16:30)',
    );
  }

  const validMinutes = minutes === 0 || minutes === 30;

  if (!validMinutes) {
    throw new BadRequestException(
      'Solo se permiten intervalos de 30 minutos',
    );
  }

  const occupied = await this.meetingRepository.findOne({
    where: {
      startTime: newStart,
      status: Not(MeetingStatus.CANCELLED),
      id: Not(id),
    },
  });

  if (occupied) {
    throw new BadRequestException('Este horario ya está ocupado');
  }

  const newEnd = new Date(newStart.getTime() + 30 * 60000);

  if (meeting.googleEventId) {
    await this.googleMeetService.updateEvent(
      meeting.googleEventId,
      newStart,
      newEnd,
    );
  }

  meeting.startTime = newStart;
  meeting.endTime = newEnd;
  meeting.status = MeetingStatus.CONFIRMED;

  return await this.meetingRepository.save(meeting);
}
