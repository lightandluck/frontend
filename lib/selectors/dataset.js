import { selectPageCount, selectFetchedAll } from './pagination'

const usersDatasetsSection = 'popularDatasets'
const usersDatasetsNode = 'popularDatasets'

export function selectDatasetByName (state, peername, name) {
  const { datasets } = state.entities
  const commits = Object.keys(datasets).filter(id => {
    return (datasets[id].peername === peername && datasets[id].name === name)
  })
  function compareCommits (a, b) {
    const timestampA = datasets[a].dataset.commit.timestamp
    const timestampB = datasets[b].dataset.commit.timestamp

    if (timestampB < timestampA) {
      return -1
    }
    if (timestampA < timestampB) {
      return 1
    }
    return 0
  }
  commits.sort(compareCommits)
  const id = commits ? commits[0] : undefined
  return id ? datasets[id] : undefined
}

export function selectDatasetByPath (state, path) {
  const { datasets } = state.entities
  return datasets ? datasets[path] : undefined
}

export function selectDatasetData (state, path) {
  const data = state.entities.data[path]
  return data ? data.data : undefined
}

export function selectDatasetIdByName (state, peername, name) {
  const datasetRef = selectDatasetByName(state, peername, name)
  return datasetRef ? datasetRef.path : ''
}

export function selectDatasetDataIsFetching (state, path) {
  const data = state.pagination && state.pagination.datasetData && state.pagination.datasetData[path]
  return data ? data.isFetching : false
}

export function selectLocalDatasetByPath (state, path) {
  const { datasets } = state.locals
  return datasets ? datasets[path] : undefined
}

export function selectLocalDatasetByName (state, peername, name) {
  const { datasets } = state.locals
  const id = Object.keys(datasets).find(id => (datasets[id].peername === peername && datasets[id].name === name))
  return id ? datasets[id] : undefined
}

export function selectDatasetSearchString (state) {
  return state.app.search.dataset ? state.app.search.dataset : ''
}

export function selectDatasets (state, section, node) {
  if (!section && !node) {
    section = usersDatasetsSection
    node = usersDatasetsNode
  }
  const { datasets } = state.entities
  function comparedatasets (a, b) {
    const timestampA = datasets[a].dataset.commit.timestamp
    const timestampB = datasets[b].dataset.commit.timestamp
    //
    if (timestampB < timestampA) {
      return -1
    }
    if (timestampA < timestampB) {
      return 1
    }
    return 0
  }
  return selectDatasetsIds(state, section, node, comparedatasets).map(id => datasets[id])
}

export function selectDatasetsPageCount (state, section, node) {
  if (!section && !node) {
    section = usersDatasetsSection
    node = usersDatasetsNode
  }
  return (state.pagination[section] && state.pagination[section][node]) ? state.pagination[section][node].pageCount : 0
}

export function selectDatasetsFetchedAll (state, section, node) {
  if (!section && !node) {
    section = usersDatasetsSection
    node = usersDatasetsNode
  }
  return (state.pagination[section] && state.pagination[section][node]) ? state.pagination[section][node].fetchedAll : false
}

export function selectDatasetsIds (state, section, node, compare) {
  if (!section && !node) {
    section = usersDatasetsSection
    node = usersDatasetsNode
  }
  let ids = (state.pagination[section] && state.pagination[section][node]) ? state.pagination[section][node].ids : []
  if (compare) {
    ids.sort(compare)
  }
  return ids
}

export function selectNoDatasets (state, section, node) {
  if (!section && !node) {
    section = usersDatasetsSection
    node = usersDatasetsNode
  }
  return (state.pagination[section] && state.pagination[section][node] && selectDatasetsPageCount(state, section, node) === 1 && selectDatasetsFetchedAll(state, section, node) === true && selectDatasetsIds(state, section, node).length === 0)
}

export function selectNoDatasetData (state, section, node) {
  if (!section && !node) {
    section = usersDatasetsSection
    node = usersDatasetsNode
  }
  const data = selectDatasetData(state, node)
  return !!(state.pagination[section] && state.pagination[section].node) && selectPageCount(state, section, node) === 1 &&
 selectFetchedAll(state, section, node) === true && (data === [] || data === {})
}
