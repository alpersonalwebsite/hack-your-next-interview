# Competitions

## Find the winner

Given 2 arrays (one with the Teams in competition and the other with the results), return the most winning Team.

I have seen `2 implementations` of this challenge depending on the `results` array.

1. `results` array represents the index of the winner

Example:

```js
const gamesPlayed = [
  ['Team1', 'Team2'], // Team1 because the index is 0
  ['Team2', 'Team3'], // Team3 because the index is 1
  ['Team3', 'Team1']  // Team1 because the index is 1
]

const gamesResults = [0, 1, 1]
```

In this case, the winner would be: **Team1**


2. `results` array represents if the **first element** of the Team arrays won (1) or lost(0)

```js
const gamesPlayed = [
  ['Team1', 'Team2'], // Team2 because Team1 is 0
  ['Team2', 'Team3'], // Team2 because Team2 is 1
  ['Team3', 'Team1']  // Team3 because Team3 is 1
]

const gamesResults = [0, 1, 1]
```

In this case, the winner would be: **Team2**

Let's go with a possible solution for **implementation 2**

```js
function winnerTeam(sets, results) {
  const mapResult = {}
  let result = ''
  
  let currenSet = 0
  
  for (let element of results) {
    
    const winnerTeam = element > 0 ? sets[currenSet][0] : sets[currenSet][1]
    
    if (!mapResult[winnerTeam]) mapResult[winnerTeam] = 3
    else mapResult[winnerTeam] = mapResult[winnerTeam] + 3
    
    if (Object.keys(mapResult).length === 0) result = winnerTeam
    else result = mapResult[result] > mapResult[winnerTeam] ? result : winnerTeam
    
    currenSet++
  }
  
  return result 
}

const gamesPlayed = [
  ['Team1', 'Team2'],
  ['Team2', 'Team3'],
  ['Team3', 'Team1']
]

// If the first Team of the subarray won it would be 1 if not 0
const gamesResults = [0, 1, 1]

winnerTeam(gamesPlayed, gamesResults)
```

Output:

```
'Team2'
```