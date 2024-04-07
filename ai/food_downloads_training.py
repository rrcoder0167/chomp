from bing_image_downloader import downloader

def download_images(query):
    downloader.download(query, limit=500,  output_dir='/Users/riddhiman.rana/Desktop/Coding/chomp/ai/training_data', adult_filter_off=False, force_replace=False, timeout=60)

download_images("Coca Cola can")
download_images("Seven Up Can")