import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { scheduler } from 'node:timers/promises'
import { distance } from 'fastest-levenshtein'

import { id } from './index.js'

describe('id generator', async () => {
  test('id generator with prefix', async () => {
    const prefix = 'test'
    const generatedId = id(prefix)
    assert.ok(generatedId)
    assert.ok(generatedId.startsWith(prefix))
  })

  test('id generator without prefix', async () => {
    const generatedId = id()
    assert.ok(generatedId)
    assert.ok(!generatedId.startsWith('_'))
  })

  test('id generator with empty prefix', async () => {
    const prefix = ''
    const generatedId = id(prefix)
    assert.ok(generatedId)
    assert.ok(!generatedId.startsWith('_'))
  })

  test('id generator should generate sortable ids with high distance', async () => {
    const prefix = 'test'
    const generatedId1 = id(prefix)
    await scheduler.wait(1)

    const generatedId2 = id(prefix)
    await scheduler.wait(1)

    const generatedId3 = id(prefix)

    assert.ok(generatedId1)
    assert.ok(generatedId2)
    assert.ok(generatedId3)

    assert.ok(generatedId1 < generatedId2)
    assert.ok(generatedId2 < generatedId3)
    assert.ok(generatedId1 < generatedId3)

    assert.ok(distance(generatedId1, generatedId2) >= 1)
    assert.ok(distance(generatedId2, generatedId3) >= 1)
    assert.ok(distance(generatedId1, generatedId3) >= 1)
  })

  test('id generator should generate sortable ids with low distance in shortes interval', async () => {
    const prefix = 'test'
    const generatedId1 = id(prefix)
    const generatedId2 = id(prefix)
    const generatedId3 = id(prefix)

    assert.ok(generatedId1)
    assert.ok(generatedId2)
    assert.ok(generatedId3)

    assert.ok(generatedId1 < generatedId2)
    assert.ok(generatedId2 < generatedId3)
    assert.ok(generatedId1 < generatedId3)

    assert.ok(distance(generatedId1, generatedId2) >= 1)
    assert.ok(distance(generatedId2, generatedId3) >= 1)
    assert.ok(distance(generatedId1, generatedId3) >= 1)
  })

  test('id generator should generate massive amount of sortable ids', async () => {
    const prefix = 'test'
    const generatedIds = []
    for (let i = 0; i < 100000; i++) {
      generatedIds.push(id(prefix))
    }
    assert.ok(generatedIds)
    for (let i = 0; i < generatedIds.length - 1; i++) {
      assert.ok(generatedIds[i] < generatedIds[i + 1])
    }
  })
})
