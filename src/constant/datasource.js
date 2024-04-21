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
export const datasource = {};


datasource.memory = "/businessProcess";
datasource.cache = "/businessProcessRedis";
datasource.database = "/businessProcessTmp";