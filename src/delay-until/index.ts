export async function delayUntil(delay = 0): Promise<void> {
  return new Promise<void>((resolve) => {
    const delayNum = 'number' === typeof(delay) ? +delay : 0;

    if (delayNum < 1) resolve();
    else setTimeout(resolve, delayNum);
  });
}
