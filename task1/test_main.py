import unittest
from task1_solution import most_frq_len

class TestingModule(unittest.TestCase):
    def test_given_test_case(self):
        self.assertEqual( most_frq_len(['a', 'ab', 'abc', 'cd', 'def', 'gh']),['ab', 'cd', 'gh'])

    def test_empty_list(self):
        self.assertEqual(most_frq_len([]), [])

    def test_single_string(self):
        self.assertEqual(most_frq_len(['abc']), ['abc'])

    def test_all_same_length(self):
        self.assertEqual(most_frq_len(['a', 'b', 'c']), ['a', 'b', 'c'])

    def test_tie_result(self):
        self.assertEqual( most_frq_len(['a', 'bb', 'cc', 'ddd', 'eee']), ['bb', 'cc', 'ddd', 'eee'])

    def test_duplication(self):
        self.assertEqual( most_frq_len(['a', 'a', 'bb', 'bb', 'ccc']), ['a', 'a', 'bb', 'bb'])

    def test_input_not_list(self):
        with self.assertRaises(TypeError):
            most_frq_len("not a list")

    def test_element_not_string(self):
        with self.assertRaises(TypeError):
            most_frq_len(['ab', 123, 'cd'])


if __name__ == "__main__":
    unittest.main()