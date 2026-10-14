import {test} from 'node:test'
import assert from 'node:assert/strict'
import {hallOfFameDestination} from '../src/features/hall-of-fame/destination.ts'
test('only enabled exact HTTPS release origin replaces existing Give fallback',()=>{
  assert.equal(hallOfFameDestination(undefined,'true'),null);assert.equal(hallOfFameDestination('https://hall.example.org','false'),null)
  for(const origin of ['http://hall.example.org','https://user:password@hall.example.org','https://hall.example.org/path','https://localhost','https://african-impact-hall-of-fame-preview.vercel.app'])assert.equal(hallOfFameDestination(origin,'true'),null)
  assert.equal(hallOfFameDestination('https://hall.example.org','true'),'https://hall.example.org')
})
