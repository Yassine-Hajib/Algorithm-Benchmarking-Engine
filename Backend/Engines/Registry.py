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
ALGORITHMS = {
    "sum": summ,
    "factorial_recursive"     : factorial_with_metrics,
    "factorial_iterative"     : iterativeFactoriel,
    "Fibonnaci_Recursive"     : Fibonnaci_Recursive,
    "Fibonnaci_Iterative"     : Fibonnaci_Iterative,
    "Bubble_sort_Iterative"   : bubble_sort_Iterative,
    "Bubble_sort_Recursive"   : bubble_sort_Recursive,
    "Binary_Search_Iterative" : Binary_Search_Iterative,
    "Binary_Search_Recursive" : Binary_Search_Recursive,
    "Insertion_sort_Iterative":Insertion_sort_Iterative,
    "Insertion_sort_Recursive" : Insertion_sort_Recursive,
    "BFS_Iterative" : BFS_Iterative ,
    "BFS_Recursive" : BFS_Recursive,
    "DFS_Iterative" : DFS_Iterative ,
    "DFS_Recursive" : DFS_Recursive 

}