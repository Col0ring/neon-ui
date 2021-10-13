export enum CacheStatus {
  Create = 0,
  Created = 1,
  Active = 2,
  Activated = 3,
  DeActivated = 4,
  Destroy = 5,
}

export const CachePrefix = {
  keepaliveIdPrefix: 'neon-keepalive-cache',
  cacheContainerIdPrefix: 'element-cache',
}
