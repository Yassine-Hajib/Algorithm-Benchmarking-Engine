from Backend.Engines.Runner import run_algorithm 
from Backend.Engines.Runner import compare_algorithms

def main():
    print("Sum", run_algorithm("sum", 4))
    print(compare_algorithms("factorial_recursive","factorial_iterative", 5))
    print(run_algorithm("Fibonnaci_Recursive",5))  
    print(run_algorithm("Fibonnaci_Iterative",5))
    print(run_algorithm("Bubble_sort_Iterative",[5,8,3,1]))
    print(run_algorithm("Bubble_sort_Recursive",[5,8,3,1]))
    print(run_algorithm("Binary_Search_Iterative", {"arr": [3,1,4,9,0,2], "target": 0}))
    print(run_algorithm("Binary_Search_Recursive",{"arr": [3,1,4,9,0,2], "target": 0}))
    


if __name__ == "__main__":
    main()
# It prevents code from executing automatically when imported  