export const submitAppointment = async ({
  appointmentForm,
  appointmentService,
  submitButtonState,
  redirect,
  toast,
}) => {
  submitButtonState.setLoading();
  try {
    await appointmentService.submit(appointmentForm.collect());
    redirect.to('sucesso.html');
  } catch {
    toast.show('Nao foi possivel enviar o agendamento. Tente novamente.');
    submitButtonState.reset();
  }
};
