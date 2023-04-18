# encoding: utf-8
import base64
import rsa
from binascii import b2a_hex, a2b_hex


class RsaUtil():

    @staticmethod
    def rsa_encrypt_text1(public_key, decrypt_text: str, method="base64") -> str:
        """
        RSA加密
        :param public_key:  公钥
        :param decrypt_text: 明文
        :param method: 用base64加密还是16进制字符串
        :return: 加密后的数据
        """
        encrypt_text = rsa.encrypt(decrypt_text.encode('utf-8'), rsa.PublicKey.load_pkcs1(public_key))
        if method == "base64":
            return base64.b64encode(encrypt_text).decode()
        else:
            return b2a_hex(encrypt_text).decode()

    @staticmethod
    def rsa_encrypt_text2(public_key, _text: str, method="base64") -> str:
        """
        RSA加密，针对setPublicKey
        :param public_key:  公钥
        :param _text: 明文
        :param method: 用base64加密还是16进制字符串
        :return: 加密后的数据
        """
        encrypt_text = rsa.encrypt(_text.encode(), rsa.PublicKey.load_pkcs1_openssl_pem(public_key))
        if method == "base64":
            return base64.b64encode(encrypt_text).decode()
        else:
            return b2a_hex(encrypt_text).decode()

    @staticmethod
    def rsa_encrypt_text3(key, _text: str, method="base64"):
        """
        RSA加密，针对new RSAKeyPair
        import rsa
        from binascii import b2a_hex
        :param key: 公钥的参数
        :param _text: 待加密的明文
        :param method: 用base64加密还是16进制字符串
        :return: 加密后的数据
        """
        e = int('010001', 16)
        n = int(key, 16)
        pub_key = rsa.PublicKey(e=e, n=n)
        encrypt_text = rsa.encrypt(_text.encode(), pub_key)
        if method == "base64":
            return base64.b64encode(encrypt_text).decode()
        else:
            return b2a_hex(encrypt_text).decode()

    @staticmethod
    def rsa_decrypt_text(private_key, encrypt_text: str, method="base64") -> str:
        """
        RSA解密
        :param private_key: 私钥
        :param encrypt_text: 密文
        :return: 明文
        """
        if method == "base64":
            decrypt_text = rsa.decrypt(base64.b64decode(encrypt_text), rsa.PrivateKey.load_pkcs1(private_key)).decode(
                'utf8')
        else:
            decrypt_text = rsa.decrypt(a2b_hex(encrypt_text), rsa.PrivateKey.load_pkcs1(private_key)).decode('utf8')
        return decrypt_text

    @staticmethod
    def rsa_sign(private_key, decrypt_text, method="MD5"):
        """
        rsa签名
        :param private_key: 私钥
        :param decrypt_text: 明文
        :param method: 'MD5', 'SHA-1','SHA-224', SHA-256', 'SHA-384' or 'SHA-512'
        :return:
        """
        sign_text = rsa.sign(decrypt_text.encode('utf-8'), rsa.PrivateKey.load_pkcs1(private_key), method)
        sign_text = base64.b64encode(sign_text).decode()
        return sign_text

    @staticmethod
    def rsa_verify(signature, public_key, decrypt_text):
        """
        rsa验签
        :param signature: rsa签名
        :param public_key: 公钥
        :param decrypt_text: 明文
        :return:
        """
        return rsa.verify(decrypt_text.encode('utf-8'), base64.b64decode(signature),
                          rsa.PublicKey.load_pkcs1(public_key))


from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP, AES, PKCS1_v1_5


class Rsa(object):
    def __init__(self, pubkey):
        self.pubkey = RSA.import_key(pubkey)

    def decrypt(self, private_key, data):
        cipher = PKCS1_OAEP.new(private_key, hashAlgo=SHA256)
        return cipher.decrypt(data)

    def encrypt(self, data):
        cipher = PKCS1_OAEP.new(self.pubkey, hashAlgo=SHA256)
        return cipher.encrypt(data)


if __name__ == "__main__":

    rsaObj = RsaUtil()
    public_key = """-----BEGIN PUBLIC KEY-----
                 MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCGwmr39OKRP1KaI4REddlpLDrcuTDh23G+ZdTerHqiN835GR+AjAcvtuLGBfYMf3eqOLHJcJ5oU/UR8ODmOSnYATDwqYpoV42lq4OzqSBgElFQXw0LDAMefo/ITfBnUD1/ZTZ+Lh2JhgP7FxtpQb1cverqhNWiO3u+4KBz69p3SQIDAQAB
                    -----END PUBLIC KEY-----
                 """
    decrypt_text = '9e871b2d-4775-4d46-9960-b3773dc1fa72'
    print(rsaObj.rsa_encrypt_text2(public_key, decrypt_text))