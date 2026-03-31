from Backend.Algorithmes.Sum_recursive import summ
from Backend.Algorithmes.Factoriel_recursive import factorial_with_metrics
from Backend.Algorithmes.Factorial_iterative import iterativeFactoriel
from Backend.Algorithmes.Fibonnaci_Recursive import Fibonnaci_Recursive
from Backend.Algorithmes.Fibonnaci_Iterative import Fibonnaci_Iterative
from Backend.Algorithmes.Bubble_Sort_Iterative import bubble_sort_Iterative
from Backend.Algorithmes.Bubble_Sort_Recursive import bubble_sort_Recursive
from Backend.Algorithmes.Binary_Search_Iterative import Binary_Search_Iterative
from Backend.Algorithmes.Binary_Search_Recursive import Binary_Search_Recursive
from Backend.Algorithmes.Insertion_sort_Iterative import Insertion_sort_Iterative
from Backend.Algorithmes.Insertion_sort_Recursive import Insertion_sort_Recursive
from Backend.Algorithmes.BFS_Iterative import BFS_Iterative
from Backend.Algorithmes.BFS_Recursive import BFS_Recursive
from Backend.Algorithmes.DFS_Iterative import DFS_Iterative
from Backend.Algorithmes.DFS_Recursive import DFS_Recursive
from Backend.Algorithmes.Quick_Sort_Iterative import Quick_Sort_Iterative
from Backend.Algorithmes.Quick_Sort_Recursive import Quick_Sort_Recursive
from Backend.Algorithmes.Prime_Checker_Iterative import Prime_Checker_Iterative
from Backend.Algorithmes.Prime_Checker_Recursive import Prime_Checker_Recursive
from Backend.Algorithmes.Linear_Search_Iterative import Linear_Search_Iterative
from Backend.Algorithmes.Linear_Search_Recursive import Linear_Search_Recursive
from Backend.Algorithmes.Merge_Sort_Iterative import Merge_Sort_Iterative
from Backend.Algorithmes.Merge_Sort_Recursive import Merge_Sort_Recursive
from Backend.Algorithmes.Heap_Sort_Iterative import Heap_Sort_Iterative
from Backend.Algorithmes.Heap_Sort_Recursive import Heap_Sort_Recursive
from Backend.Algorithmes.Hanoi_Iterative import Hanoi_Iterative
from Backend.Algorithmes.Hanoi_Recursive import Hanoi_Recursive
from Backend.Algorithmes.Power_Iterative import Power_Iterative
from Backend.Algorithmes.Power_Recursive import Power_Recursive
from Backend.Algorithmes.GCD_Iterative import GCD_Iterative
from Backend.Algorithmes.GCD_Recursive import GCD_Recursive
from Backend.Algorithmes.Palindrome_Iterative import Palindrome_Iterative
from Backend.Algorithmes.Palindrome_Recursive import Palindrome_Recursive

ALGORITHMS = {
    # Sorting
    "Bubble_sort_Iterative" : bubble_sort_Iterative,
    "Bubble_sort_Recursive" : bubble_sort_Recursive,
    "Insertion_sort_Iterative" : Insertion_sort_Iterative,
    "Insertion_sort_Recursive" : Insertion_sort_Recursive,
    "Quick_Sort_Iterative" : Quick_Sort_Iterative,
    "Quick_Sort_Recursive" : Quick_Sort_Recursive,
    "Merge_Sort_Iterative" : Merge_Sort_Iterative,
    "Merge_Sort_Recursive" : Merge_Sort_Recursive,
    "Heap_Sort_Iterative": Heap_Sort_Iterative,
    "Heap_Sort_Recursive" : Heap_Sort_Recursive,

    # Searching 
    "Binary_Search_Iterative" : Binary_Search_Iterative,
    "Binary_Search_Recursive": Binary_Search_Recursive,
    "Linear_Search_Iterative" : Linear_Search_Iterative,
    "Linear_Search_Recursive": Linear_Search_Recursive,

    # Graph
    "BFS_Iterative": BFS_Iterative,
    "BFS_Recursive": BFS_Recursive,
    "DFS_Iterative": DFS_Iterative,
    "DFS_Recursive": DFS_Recursive,

    # Math
    "sum"  : summ,
    "factorial_recursive": factorial_with_metrics,
    "factorial_iterative": iterativeFactoriel,
    "Fibonnaci_Recursive": Fibonnaci_Recursive,
    "Fibonnaci_Iterative": Fibonnaci_Iterative,
    "Prime_Checker_Iterative": Prime_Checker_Iterative,
    "Prime_Checker_Recursive": Prime_Checker_Recursive,
    "Hanoi_Iterative" : Hanoi_Iterative,
    "Hanoi_Recursive" : Hanoi_Recursive,
    "Power_Iterative" : Power_Iterative,
    "Power_Recursive" : Power_Recursive,
    "GCD_Iterative" : GCD_Iterative,
    "GCD_Recursive" : GCD_Recursive,
    "Palindrome_Iterative" : Palindrome_Iterative,
    "Palindrome_Recursive": Palindrome_Recursive,
}

def get_algorithm_metadata():
  
    return {name: {"id": name, "has_dual_mode": "_recursive" in name or "_iterative" in name} 
            for name in ALGORITHMS.keys()}