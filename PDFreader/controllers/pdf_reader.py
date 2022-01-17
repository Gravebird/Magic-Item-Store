from pdfreader import SimplePDFViewer, PageDoesNotExist
import os


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
            print("".join(self._viewer.canvas.strings))
            print(self._viewer.canvas.strings)
            print(self._viewer.canvas.text_content)
            page += 1