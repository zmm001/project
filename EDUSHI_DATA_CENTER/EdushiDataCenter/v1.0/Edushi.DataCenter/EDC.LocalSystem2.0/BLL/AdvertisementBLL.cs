�}� r �  �����:� ��a	��� �ӟ����M�����/���%jDm<�"}�XG�m;r9���P��)�D�+��l�u:b��>>ETf�,��K�Pb��<6+�K��O�9��f��/����#�z�g���AՕ��۞NT�z�r�D;���&�{����%|*" ����yɵW,���;aڰu��ا�:X��xy��L��S�:���u��Ly�s��`U�|��I�O�Zz?c4@�t����N��T���ӻ��i��W��i�d>��b#� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�"�����V��-�ݐj,�+�y�%+S�%0��Pg2���l��9o��������V[O^���U$�88_U�<y<�y=&A�Eu�6��ut�:��k`���u�G'�����_).V��`#�UD�|~z	� Xr��k6��n
D��('��'��U�v��{=�������.�]�FS���n*5�YԊ����C�V�'�X̳�Nt'd�������x��@HFC�����D��K���P>�ۺ��"k��-Ճ��A��e�im�_3x*���;�d�;�j2s��M�$�>v��B�ׂ�'�����s���H�o�e��U��c�n��>�N)��W���18A��0���Yjy��ig�����w�M����{�<�ysٕN!ƍ����q�5[e����Y���c��)!U�pg�4���:X�������};�U`�2b実�"������'������2�U:�a�‖jo�Ul�	� 2pڌ�נ��Ѕ��8��˺l#��:ي�v�r��U���>�R��7�)�-��Μ><���c����dM�����a�"D�~�80�_�̫���ƣ�;R�O�sc��ӥ������Rw�T�7 �.�nr�)cZ�����>��5�ǿ�W9¢R䴬�o�}��wY�xЉ*���x،-!-�O�a��HL�(ێ�D�>*9�ß�{F�6�{�;!�|iQ��f�et^H7@RwC-�S"Uc��^��!H����iQ�2�IGu�3H�GR���Fss���w� �¤��.�zVc��WA>�s�c2�_��]�}���Q��vV��cf��4 4�\�2|��t�'Fi����δ˵UE��~�������r����� �M�t��*�	�iJ��8�#D)|��?�F)Ig��_M�����1͠'D;�Z������7�� ;T9��&�]o��":��K�2��[��F�R���3��J�����^�D�D9�>l�܃}�:��-G�N�$�������G���;~s></returns>
        public DataTable GetAdvertisementList(int iPageSize, int iCurrPageIndex, string strWhere, out int iRecordCount)
        {
            return dal.GetAdvertisementList(iPageSize, iCurrPageIndex, strWhere, out iRecordCount);
        }

        #region IDisposable ��Ա

        public void Dispose()
        {
            
        }

        #endregion
    }
}
