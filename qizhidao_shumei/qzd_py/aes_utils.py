# -*- coding: utf-8 -*-

# @Time    : 2023/4/18 10:34
# @File    : aes_utils.py
# @Software: PyCharm


import base64
import binascii

from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad


class Encrypt(object):
    def __init__(self):
        self.AES_MODE = AES.MODE_CBC
        self.key = bytes.fromhex("F1593376766EA98D34F31B057A9D5BE4")
        self.iv = bytes.fromhex("1FE109A4125283F418DE9E051A969E12")

    def aes_enc(self, plain_text: bytes) -> bytes:
        """
        AES加密函数
        :param plain_text:
        :return: str
        """
        cipher = AES.new(self.key, self.AES_MODE, self.iv)
        pad_pkcs7 = self.zeropadding(plain_text)
        return cipher.encrypt(pad_pkcs7)

    def zeropadding(self, data):
        bs = AES.block_size
        padding = bs - len(data) % bs
        padding_text = (chr(0) * padding).encode("utf-8")
        return data + padding_text

    # def aes_enc(self, plain_text: bytes) -> bytes:
    #     """
    #     AES加密函数
    #     :param plain_text:
    #     :return: str
    #     """
    #
    #     cipher = AES.new(self.key, self.AES_MODE, self.iv)
    #     pad_pkcs7 = pad(plain_text, AES.block_size, style='pkcs7')
    #     return cipher.encrypt(pad_pkcs7)

    def aes_dec(self, cipher_text: bytes) -> bytes:
        """
        AES解密函数
        :param cipher_text:
        :return: str
        """

        cipher = AES.new(self.key, self.AES_MODE, self.iv)
        pad_text = cipher.decrypt(cipher_text)
        plain_text = unpad(pad_text, AES.block_size, style='pkcs7')
        return plain_text


# e = Encrypt()
# e.key = "56fb803fa2514a40".encode()
# e.iv = "0102030405060708".encode()
#
# text = 'H4sIAAAAAAAAAyWUx7KjSgyG3+VsmRqaYKCnahZgMNGAMSZ4R44mmOyp++4Xzlmp+pP0S11S97+v7t2ObdTWX39w7NfXnLyHom2+/nwRv8Fv8PXra3gV8X7EAU4AQGIMgCcAYAhxDMAoSRISUAzEYyZkApKkIBmRREAlANAkCSkyoGM6oCjqUOqSXedWwVSyyB5y7d+dJevOdptVu9XluKhs2Ac0e/jGcWeyc3vD8aQI1ZpJOrC3RyMKzKpq/my9ZqFClHQrJLQGNDhy0kPvPgQT25PXDHoeGnNMyZKfhXZA5EzdzWuiPW7ujzt9zrlCPdm2/8kNd0YLvfD2dDZqvtl73tmCVPYdMRKNrSRB45GbWQorgTCsrgMLffIUr0SSKkFucmnEaYsP7RuZcQr9jYGxCWrdGMWAEkQCZ8d6TG1ho6uACe1gsr0uf9LbOWuJ21W64PwNqilXLOvn1rX+xUOojsUuqdpE7iPI13iB+EeZkLMJ5zS+LObE6q5gXMPKRLTJttPRIblhiYbs9D6DxrKZXHNzItIfPZ4SAw23/kIqayiU55CoKfrESJTsYnfjg2ZCbwRBmzbEbIr8ksHqIQJfYMDDc3FDTGIcMXiO4ZVsJLduhuaz6OjQFC0HsOBhGkagCgUpDI72gk9Me8MAsxmtOqUGICTsJtYqa73cpLyf7ZiyWvot8Y46NpA20KjPk3PkrvLygqdkQlIOKS7joxxQklPL16uXSor/oPZlvA7HTKZjdmLrNSZprUguOFj4keLndQzZv4d/eP/sVNPt9nJh/cbfQpKGKzODNTc9w/yJS4tjB2T9Fct5MvnMweZtZ1ORmkkeYN2NPFiYHTp2KKzO6KrC7WBVuTNp+3wkrCYe5feuJNHOZhF10R4mjebQmnTCImuQr7fvestr9yfPtgwQhTWG75wp39m1w9y6C4a3kh2sOepFSeEEWhbeHPWU3QfM4Njz8zJIUoQAN1juxHZlvPnOrdv3WxkO7SpGldVNVmHKhlbkfb5TuQcudXcq8eL3YkocH2KFGvqYP2UUE2gqWuDLd2/z0Yd510USXwHWh0w9ZoT7yWCtn01/gdTDeKiW21LRmZuRpoCrKsnao21O4Yi0ijJz3nMzvK3X5X4991k/vsSgv4/BlhgiTS0QRQyPZp/VKiDoc5aTOYhM8rT5cp1jdtOT8ugq6WyD2rqK6N1xFQ9mPmpFxE9/+fGuyYt82URduvVLXL3Eas5OKn/nlHq0NXqit9FNlzBCa8YQkLi5viexsziki3tg46qZbu0NJqUbC+LiidGEO1keZbpfoqUgSPSoMjn/WL3BHLFab/zSE/zBAoVJeR+Kl9cweoK5AB8aWcXtevRUHP/FYrgWp4vsOQDZ5RVoeJis7zboB9/vpljKqktSJMUmky/eKN9BIDEojI59+O9/c7xLxnsFAAA='.encode()
# print(e.aes_enc(text).hex())