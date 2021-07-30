const testLineup = ['1B', '2B', '3B', 'C', 'OF', 'OF', 'OF', 'P', 'SS']

const validateLineup = (lineup) => {
  return (checkSalary(lineup) && checkPlayerTeams(lineup) && checkGames(lineup) && checkPositions(lineup, testLineup))
}

// Check Salary
const checkSalary = (lineup) => {
  let totalSalary = 0;

  lineup.forEach(player => totalSalary += player.salary)

  return (totalSalary <= 45000) ? true : false
}

// Check Player Teams
const checkPlayerTeams = (lineup) => {
  let teamsObj = lineup
    .map(teamId => teamId.teamId)
    .reduce((obj, team) => {
      if (!obj[team]) {
        obj[team] = 0
      }
      obj[team]++

      return obj
    }, {})

  for (const teamId in teamsObj) {
    if (teamsObj[teamId] > 2) return false
  }

  return true
}

// Check Number of Games
const checkGames = (lineup) => {
  let gamesObj = lineup
    .map(gameId => gameId.gameId)
    .reduce((obj, game) => {
      if (!obj[game]) {
        obj[game] = 0
      }
      obj[game]++

      return obj
    }, {})

  for (const gameId in gamesObj) {
    if (gamesObj[gameId] > 3) return false
  }

  return true
}

// Check Positions
const checkPositions = (lineup, testLineup) => {
  let positionsOk = true
  let positionsArr = lineup.map(position => position.position).sort()

  if (positionsArr.length !== testLineup.length) return false

  positionsArr.forEach((postition, index) => {
    if (postition !== testLineup[index]) {
      positionsOk = false
    }
  })

  return positionsOk
}

module.exports = validateLineup

