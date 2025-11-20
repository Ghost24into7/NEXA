from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import sympy as sp
from sympy import symbols, sympify, simplify, expand, factor, diff, integrate, solve, limit, series
from sympy.parsing.sympy_parser import parse_expr
import mpmath
import numpy as np

app = FastAPI(title="Legendary Calc API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class SymbolicRequest(BaseModel):
    expression: str
    operation: str
    variable: Optional[str] = "x"
    params: Optional[dict] = {}

class SymbolicResponse(BaseModel):
    result: str
    latex: Optional[str] = None
    steps: Optional[List[str]] = None
    error: Optional[str] = None

class IntegrationRequest(BaseModel):
    expression: str
    variable: str = "x"
    lower: Optional[float] = None
    upper: Optional[float] = None
    precision: Optional[int] = 50

class SolveRequest(BaseModel):
    equation: str
    variable: str = "x"

class GraphDataRequest(BaseModel):
    expression: str
    variable: str = "x"
    start: float = -10
    end: float = 10
    points: int = 1000

@app.get("/")
async def root():
    return {"message": "NEXA API - Numerical Engine for Exact Answers", "status": "running", "version": "1.0.0"}

@app.post("/symbolic/simplify", response_model=SymbolicResponse)
async def simplify_expression(req: SymbolicRequest):
    """Simplify a symbolic expression"""
    try:
        expr = sympify(req.expression)
        result = simplify(expr)
        return SymbolicResponse(
            result=str(result),
            latex=sp.latex(result)
        )
    except Exception as e:
        return SymbolicResponse(result="", error=str(e))

@app.post("/symbolic/expand", response_model=SymbolicResponse)
async def expand_expression(req: SymbolicRequest):
    """Expand a symbolic expression"""
    try:
        expr = sympify(req.expression)
        result = expand(expr)
        return SymbolicResponse(
            result=str(result),
            latex=sp.latex(result)
        )
    except Exception as e:
        return SymbolicResponse(result="", error=str(e))

@app.post("/symbolic/factor", response_model=SymbolicResponse)
async def factor_expression(req: SymbolicRequest):
    """Factor a symbolic expression"""
    try:
        expr = sympify(req.expression)
        result = factor(expr)
        return SymbolicResponse(
            result=str(result),
            latex=sp.latex(result)
        )
    except Exception as e:
        return SymbolicResponse(result="", error=str(e))

@app.post("/symbolic/derivative", response_model=SymbolicResponse)
async def derivative_expression(req: SymbolicRequest):
    """Calculate derivative of an expression"""
    try:
        x = symbols(req.variable or 'x')
        expr = sympify(req.expression)
        result = diff(expr, x)
        return SymbolicResponse(
            result=str(result),
            latex=sp.latex(result)
        )
    except Exception as e:
        return SymbolicResponse(result="", error=str(e))

@app.post("/symbolic/integrate", response_model=SymbolicResponse)
async def integrate_expression(req: IntegrationRequest):
    """Calculate integral (definite or indefinite)"""
    try:
        x = symbols(req.variable)
        expr = sympify(req.expression)
        
        if req.lower is not None and req.upper is not None:
            # Definite integral
            result = integrate(expr, (x, req.lower, req.upper))
            # Try to get numerical value if possible
            try:
                numerical = float(result.evalf(req.precision or 50))
                return SymbolicResponse(
                    result=str(numerical),
                    latex=sp.latex(result)
                )
            except:
                return SymbolicResponse(
                    result=str(result),
                    latex=sp.latex(result)
                )
        else:
            # Indefinite integral
            result = integrate(expr, x)
            return SymbolicResponse(
                result=str(result) + " + C",
                latex=sp.latex(result) + " + C"
            )
    except Exception as e:
        return SymbolicResponse(result="", error=str(e))

@app.post("/symbolic/solve", response_model=SymbolicResponse)
async def solve_equation(req: SolveRequest):
    """Solve an equation"""
    try:
        x = symbols(req.variable)
        equation = sympify(req.equation)
        solutions = solve(equation, x)
        
        result_str = ", ".join([str(sol) for sol in solutions])
        latex_str = ", ".join([sp.latex(sol) for sol in solutions])
        
        return SymbolicResponse(
            result=result_str,
            latex=latex_str
        )
    except Exception as e:
        return SymbolicResponse(result="", error=str(e))

@app.post("/symbolic/limit", response_model=SymbolicResponse)
async def calculate_limit(req: SymbolicRequest):
    """Calculate limit of an expression"""
    try:
        x = symbols(req.variable or 'x')
        expr = sympify(req.expression)
        point = req.params.get('point', 0)
        direction = req.params.get('direction', '+-')
        
        result = limit(expr, x, point, direction)
        return SymbolicResponse(
            result=str(result),
            latex=sp.latex(result)
        )
    except Exception as e:
        return SymbolicResponse(result="", error=str(e))

@app.post("/symbolic/series", response_model=SymbolicResponse)
async def taylor_series(req: SymbolicRequest):
    """Calculate Taylor series expansion"""
    try:
        x = symbols(req.variable or 'x')
        expr = sympify(req.expression)
        point = req.params.get('point', 0)
        n = req.params.get('n', 6)
        
        result = series(expr, x, point, n)
        return SymbolicResponse(
            result=str(result),
            latex=sp.latex(result)
        )
    except Exception as e:
        return SymbolicResponse(result="", error=str(e))

@app.post("/graph/data")
async def generate_graph_data(req: GraphDataRequest):
    """Generate data points for graphing"""
    try:
        x = symbols(req.variable)
        expr = sympify(req.expression)
        
        # Generate x values
        x_vals = np.linspace(req.start, req.end, req.points)
        y_vals = []
        
        # Calculate y values
        for x_val in x_vals:
            try:
                y_val = float(expr.subs(x, x_val))
                y_vals.append(y_val)
            except:
                y_vals.append(None)
        
        return {
            "x": x_vals.tolist(),
            "y": y_vals,
            "expression": req.expression
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/math/arbitrary-precision")
async def arbitrary_precision_calc(expression: str, precision: int = 100):
    """Calculate with arbitrary precision using mpmath"""
    try:
        mpmath.mp.dps = precision
        result = mpmath.eval(expression)
        return {"result": str(result), "precision": precision}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
