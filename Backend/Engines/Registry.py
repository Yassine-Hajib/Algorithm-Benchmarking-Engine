from Backend.Algortihmes.Sum_recursive import summ
from Backend.Algortihmes.Factoriel_recursive import factorial_with_metrics
from Backend.Algortihmes.Factorial_iterative import iterativeFactoriel
from Backend.Algortihmes.Fibonnaci_Recursive import Fibonnaci_Recursive
from Backend.Algortihmes.Fibonnaci_Iterative import Fibonnaci_Iterative
from Backend.Algortihmes.Bubble_Sort_Iterative import bubble_sort_Iterative
from Backend.Algortihmes.Bubble_Sort_Recursive import bubble_sort_Recursive
from Backend.Algortihmes.Binary_Search_Iterative import Binary_Search_Iterative
from Backend.Algortihmes.Binary_Search_Recursive import Binary_Search_Recursive

ALGORITHMS = {
    "sum": summ,
    "factorial_recursive"     : factorial_with_metrics,
    "factorial_iterative"     : iterativeFactoriel,
    "Fibonnaci_Recursive"     : Fibonnaci_Recursive,
    "Fibonnaci_Iterative"     : Fibonnaci_Iterative,
    "Bubble_sort_Iterative"   : bubble_sort_Iterative,
    "Bubble_sort_Recursive"   : bubble_sort_Recursive,
    "Binary_Search_Iterative" : Binary_Search_Iterative,
    "Binary_Search_Recursive" : Binary_Search_Recursive

}