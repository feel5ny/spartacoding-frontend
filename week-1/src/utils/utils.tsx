export const validateResult = (task: string, deadline: string) => {
  if (!task.trim() || !deadline) {
    return false;
  }
  if (new Date(deadline) < new Date(new Date().toISOString().split('T')[0])) {
    return false;
  }
  return true;
};
