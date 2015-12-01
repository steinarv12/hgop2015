# Examples for pre-test thought

## Winning scenarios

### Horizontal

```
Given [placed(0,0,x), placed(1,0,x)]
When (placed(2,0,x))
NextState (win(x))
```

### Vertical

```
Given [placed(1,0,x), placed(1,1,x)]
When (placed(1,2,x))
NextState (win(x))
```

### Across

```
Given [placed(0,0,x), placed(1,1,x)]
When (placed(2,2,x))
NextState (win(x))
```

## Stale mate

```
Given [
		placed(placed(1,2,x)), placed(placed(0,2,o)),
		placed(placed(0,1,x)), placed(placed(2,2,o)),
		placed(placed(2,1,x)), placed(placed(1,1,o)),
		placed(placed(0,0,x)), placed(placed(1,0,o))
	  ]
When (placed(placed(2,0,x)))
NextState (Draw)
```


## Move tests

### Placement

```
Given (placed(0,0,x))
When (placed(0,0,o))
NextState (error - can't place, already taken)
```

### Concurrency

Using UNIX timestamp with ms

```
Given (placed(0,0,x) at 1448992624.457)
When (placed (0,1,x) at 1448992625.457)
NextState (error - not x's turn)
```

## Board for reference

 y
2| o,  x,  o
1| x,  o,  x
0| x,  o,  x
------------ x
   0   1   2