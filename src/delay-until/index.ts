export async function delayUntil(delay: number = 0) {
  return new Promise<void>((resolve) => {
    const delayNum = 'number' === typeof(delay) ? +delay : 0;

    if (delayNum < 1) resolve();
    else setTimeout(resolve, delayNum);
  });
}
