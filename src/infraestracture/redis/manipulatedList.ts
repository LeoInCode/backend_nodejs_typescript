import { promisify } from 'util'

export default (list: any) => {
  const setAsync = promisify(list.set).bind(list)
  const existsAsync = promisify(list.exists).bind(list);
  const getAsync = promisify(list.get).bind(list);
  const delAsync = promisify(list.del).bind(list);

  return {
    async add(key: string, value: string, dateExpiration: any) {
      await setAsync(key, value);
      list.expireat(key, dateExpiration);
    },

    async searchValue(key: string) {
      return getAsync(key);
    },

    async containsKey(key: string) {
      const result = await existsAsync(key);
      return result === 1;
    },

    async deleta(key: string) {
      await delAsync(key);
    }
  }
}