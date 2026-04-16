def sum_two_largest(nums):
    """
    Task: find the sum of the two largest numbers in a list of int.

    param nums: list of int
    return: sum of the two largest
    Optimal complexity: O(n)
    """

    #verify input matches expected type
    if not isinstance(nums, list):
        raise TypeError("input not a list")

    if not all(isinstance(item, int) for item in nums):
        raise TypeError("element in list is not type int")
    
    #edge case for empty list, or list with only 1 element

    if len(nums) < 2:
        raise ValueError("list must contain at least 2 elements")
    

    # i could have just use sort here and get the last 2 elements but that would have the
    # complexity of O(nlogn), which is not optimal. Instead I'll use a single pass solution
    # to show the underlying logic.

    if nums[0] >= nums[1]:
        first = nums[0]
        second = nums[1]
    else:
        first = nums[1]
        second = nums[0]


    for i in range(2, len(nums)):
        n = nums[i]

        if n >= first:
            second = first
            first = n
        elif n > second:
            second = n

    return first + second

