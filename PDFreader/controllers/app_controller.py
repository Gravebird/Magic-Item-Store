from controllers.pdf_reader import PDF_Reader

def run(filename, start_page, end_page):
    """
        Handles the logic that runs the program.
    """
    pdf_reader = PDF_Reader(filename, start_page, end_page)

    print(pdf_reader.get_markdown())
    print("\n\n")
    print(pdf_reader.get_plain_text())