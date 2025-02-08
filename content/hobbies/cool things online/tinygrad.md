---
date created: 2025-02-01T19:14
date modified: 2025-02-07T17:29
tags:
  - external
draft: "true"
---

[tinygrad: A simple and powerful neural network framework](https://tinygrad.org/) 

some discussions on whether to prioritize code readability vs a [[code golf]]-like system. 

## Tinygrad

2025-02-01

> We write and maintain [tinygrad](https://github.com/tinygrad/tinygrad), the fastest growing neural network framework (over 23,000 GitHub stars)
> 
> It's extremely simple, and breaks down the most [complex](https://github.com/tinygrad/tinygrad/blob/master/examples/llama.py) [networks](https://github.com/geohot/tinygrad/blob/master/examples/stable_diffusion.py) into 3 [OpTypes](https://github.com/geohot/tinygrad/blob/master/tinygrad/ops.py)
> 
> **ElementwiseOps** are UnaryOps, BinaryOps, and TernaryOps.  
> They operate on 1-3 tensors and run elementwise.  
> example: SQRT, LOG2, ADD, MUL, WHERE, etc...  
>   
> **ReduceOps** operate on one tensor and return a smaller tensor.  
> example: SUM, MAX  
>   
> **MovementOps** are virtual ops that operate on one tensor and move the data around  
> Copy-free with [ShapeTracker](https://github.com/tinygrad/tinygrad/blob/master/tinygrad/shape/shapetracker.py).  
> example: RESHAPE, PERMUTE, EXPAND, etc...  
> 
> But how...where are your CONVs and MATMULs? Read the code to solve this mystery.

## Tinybox

> We sell a computer called the tinybox. It comes in two colors + pro.
> 
> tinybox **red** and **green** are for people looking for a quiet home/office machine.  
> tinybox **pro** is for people looking for a loud compact rack machine.