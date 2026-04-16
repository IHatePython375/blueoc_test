def most_frq_len(strings):
    """
    Task: write a function that identifies the most frequent string lengths in an array of strings.

    param strings: list of strings
    return: list of strings whose lengths occur most frequently
    Optimal complexity: O(n)
    """

    #verify input matches expected type
    if not isinstance(strings, list):
        raise TypeError("input not a list.")

    if not all(isinstance(item, str) for item in strings):
        raise TypeError("element in list is not a string.")

    # Check edge case for empty list
    if not strings:
        return []

    # create a dict to track the frequency of each string length
    freq_dict = {}

    #i could have use counter for cleaner syntax but I want to show the underlying logic
    for s in strings:
        l = len(s)
        freq_dict[l] = freq_dict.get(l, 0) + 1

    # find the maximum frequency
    max_freq = max(freq_dict.values())

    # make a list of the lengths that have the maximum frequency
    most_frq_lengths = {key for key, value in freq_dict.items() if value == max_freq}

    # return all original strings that match requirements
    return [e for e in strings if len(e) in most_frq_lengths]