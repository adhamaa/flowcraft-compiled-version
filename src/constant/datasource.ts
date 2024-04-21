/**
 * datasource from database have read && edit functionality
 * datasource from cache have only read functionality
 * datasource from memory have only read functionality
 * 
 * Must have read functionality
 * 1. /listAppsBizProcess (list of all app that have business process)
 * 2. /listCycleProcess (list of all cycle process for a given business process)
 * 3. /mAllStage (list of all stage for a given cycle process)
 * 4. /mCurrentStage (current stage for a given cycle process)
 * 
 * Database have edit functionality
 * 1. /updateCycle (update cycle process for a given business process)
 * 2. /update (update stage for a given cycle process)
 */


export const datasource = {
  memory: "/businessProcess",
  cache: "/businessProcessRedis",
  database: "/businessProcessTmp",
};

export const datasource_type = {
  memory: "memory",
  cache: "cache",
  database: "database",
};

export const datasource_mapping = {
  [datasource_type.memory]: datasource.memory,
  [datasource_type.cache]: datasource.cache,
  [datasource_type.database]: datasource.database,
};

export type DatasourceType = keyof typeof datasource_type;

