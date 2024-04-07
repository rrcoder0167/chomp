from bing_image_downloader import downloader

def download_images(query):
    downloader.download(query, limit=100,  output_dir='/Users/riddhiman.rana/Downloads/images', adult_filter_off=False, force_replace=False, timeout=60)

download_images("Coca Cola can")
download_images("Doritos")
download_images("Orange fruit")
download_images("Seven Up Can")
download_images("Sprite Can")
download_images("Oreos")