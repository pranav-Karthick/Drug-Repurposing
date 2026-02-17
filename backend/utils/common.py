import logging

def get_logger(name):
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    return logging.getLogger(name)

def clean_text(text):
    return text.strip().replace('\n', ' ')
