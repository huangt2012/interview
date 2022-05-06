import qs from 'qs';
export function jsonp<T>(params: {
  url: string;
  callbackName: string;
  data: any;
  timeout?: number;
}): Promise<T> {
  return new Promise((resolve, reject) => {
    let timmerId: NodeJS.Timeout | null = null;

    const queryParams = qs.stringify({
      ...(params.data || {}),
      callback: params.callbackName,
      v: Date.now(), // 设置一个随机数防止缓存
    });

    const head = document.getElementsByTagName('head')[0];
    // 创建 script 标签
    const script = document.createElement('script');
    // 通过 script 标签发送请求
    script.src = `${params.url}?${queryParams}`;

    window[params.callbackName] = function (res) {
      if (timmerId) {
        clearTimeout(timmerId);
      }
      head.removeChild(script);
      window[params.callbackName] = null;

      resolve(res);
    };

    head.appendChild(script);
    // 设置请求超时
    if (params.timeout) {
      timmerId = setTimeout(() => {
        head.removeChild(script);
        window[params.callbackName] = null;
        reject({ msg: '请求超时' });
      }, params.timeout);
    }
  });
}