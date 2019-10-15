export const resolveProcessFromBackend = () =>
  new Promise(resolve => {
    const time = Math.random() * 1000;
    setTimeout(() => {
      resolve(time <= 900 ? '✅' : '❌');
    }, time);
  });

export const resolveProcessFromCache = () => {
  const time = Math.random() * 1000;
  return time <= 900 ? '✅' : '❌';
};
