from bs4 import BeautifulSoup
import requests
import csv

source = requests.get('https://articulo.mercadolibre.com.co/MCO-473701712-celular-libre-huawei-p20-pro-clt-l29-61-6gb-128gb-40mpx-_JM?variation=34842475202&quantity=1#reco_item_pos=1&reco_backend=machinalis-gauss&reco_backend_type=function&reco_client=navigation_trend_homes&reco_id=0d417a5f-b9ca-40f4-b8bb-a2469ec69cc7&c_id=/home/navigation-trends-recommendations/element&c_element_order=2https://articulo.mercadolibre.com.co/MCO-473701712-celular-libre-huawei-p20-pro-clt-l29-61-6gb-128gb-40mpx-_JM?variation=34842475202&quantity=1#reco_item_pos=1&reco_backend=machinalis-gauss&reco_backend_type=function&reco_client=navigation_trend_homes&reco_id=0d417a5f-b9ca-40f4-b8bb-a2469ec69cc7&c_id=/home/navigation-trends-recommendations/element&c_element_order=2').text
soup = BeautifulSoup(source, 'lxml')

fieldset = soup.find('fieldset', class_ = 'item-price')
prices = fieldset.find_all('span', class_= 'price-tag-symbol' )

if fieldset.div != None:
	discount = fieldset.div.p.text

if len(prices) == 2:
	print('Price without discount', prices[0].attrs['content'])
	print('Price with discount', prices[1].attrs['content'], discount)

else:
	print('Price', prices[0].attrs['content'])
