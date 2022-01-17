from pdfreader import PDFDocument, SimplePDFViewer

def run():
    file = open("player_handbook.pdf", "rb")
    doc = PDFDocument(file)

    print(doc.header.version)
    # print(doc.metadata)
    print(doc.root.Type)
    
    all_pages = [p for p in doc.pages()]
    print(len(all_pages))

    viewer = SimplePDFViewer(file)
    print(viewer.metadata)


if __name__ == "__main__":
    run()