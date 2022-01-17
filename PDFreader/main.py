import sys
import os
import PyPDF2 as pypdf
from controllers.app_controller import run

def main():
    """
        The user must pass in 4 arguments on the command line, each one is a page
        number.

        1: The name of the PDF file to read from
        2: The page number of the start of the spell list (short descriptions)
        3: The page number of the end of the spell list (short descriptions)
        4: The page number of the start of the spell descriptions (long descriptions)
        5: The page number of the end of the spell descriptions (long descriptions)
    """
    args = sys.argv

    if len(args) != 4:
        print("Usage: python main.py [filename.pdf]")
        exit()

    # At this point we know that there are 4 arguments given
    # Now we need to determine if they are valid

    if os.path.isfile(args[1]) == False:
        # Not a valid file!
        print(f"Error: {args[1]} is not a valid file.")
        exit()
    elif args[1].endswith(".pdf") == False:
        # Not a pdf file!
        print(f"Error: {args[1]} is not a PDF file.")
        exit()
    
    if not args[2].isnumeric() or not args[3].isnumeric():
        print(f"Error: Both {args[2]} and {args[3]} must be integers!")
        exit()

    
    # All arguments appear to be valid!

    run(args[1], int(args[2]), int(args[3]))


if __name__ == "__main__":
    main()