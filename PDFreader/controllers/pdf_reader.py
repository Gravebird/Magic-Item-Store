from pdfreader import SimplePDFViewer, PageDoesNotExist
import os
import re


spell_schools = [

]


class PDF_Reader:
    def __init__(self, filename, start_page, end_page):
        self._pdf = open(filename, 'rb')
        self._viewer = SimplePDFViewer(self._pdf)
        self._plain_text = ""
        self._markdown = ""
        self._start_page = start_page
        self._end_page = end_page

        self.read_pdf()
    

    def get_markdown(self):
        return self._markdown
    
    def get_plain_text(self):
        return self._plain_text
    

    def read_pdf(self):
        self._plain_text = ""
        self._markdown = ""
        page = self._start_page

        while page <= self._end_page:
            self._viewer.navigate(page)
            self._viewer.render()

            print(f"\nPage: {page}\n")
            content = "".join(self._viewer.canvas.strings)
            print(content)
            print(self._viewer.canvas.strings)
            # print(self._viewer.canvas.text_content)
            page += 1



            """
            Algorithm:

            First figure out where the first spell starts.
            First spell will be the words after the period from the previous spell
            up to the last word right before the name of the spell school.

            Spell ender: Spell school name

            For each spell found, pass that data into a spell class to parse it.
            """

            pattern = "[0-9][0-9][0-9]+"
            words = content.split()
            start_index = 0
            end_index = -1
            spell_found = False
            for i, word in enumerate(words):
                if re.match(pattern, word):
                    word = word[3:]
                if not spell_found:
                    start_index = i

                print(word)
    

    def find_index_of_last_period(words_array, cur_i):
        """
            Given the index of the current word, iterate backwards through the
            array until you find a period and return the index it was found at.
        """
        i = cur_i
        while i >= 0:
            if words_array[i].endswith('.'):
                return i
            else:
                i = i - 1