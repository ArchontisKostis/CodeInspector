def is_not_already_added(file, list):
    try:
        for item in list:
            if file.filename == item.filename:
                return False
        return True
    except Exception as e:
        print("Error in is_not_already_added")
        print(e)
