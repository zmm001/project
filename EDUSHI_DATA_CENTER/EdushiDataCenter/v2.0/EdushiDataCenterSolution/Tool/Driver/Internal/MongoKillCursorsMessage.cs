�}e� r �  K!���r;��a	��W��_���}�n��S
���爭aA�Cyqp��%��G��~��u���ۍ\3�Sw	46��k�ٷ���&K�m�K}�5[S���+��gI�`�=�t�k��^��9\�ں�jj��\ԕ�^�J5抨]�5:��_M��� ���j�T2f�������&%c�Ee#Λm���j �̋����r@��)/����_<��$���I�X4IVR6�Z�Z+�*q��C�{�y�x�+:�Xg�\M�����&u��sו���}�bŰ����c�x֋�I{��Gm�,"{���Q����܅��w}�Vo�Rfuޤh���6o�S��.7�.�O�hh�;Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�(O�����XbY}����MG�(�L�1��#�^��Jc��jF6(ߏ:(Hg�8����Xe�-Ժ��:�]���R휹V_�C�z�%[�L�W\�eU��iU��s�+=��$L���T>�$�<Lr�zw��7��&N� �Q��d�[�.�`��.<�H�����1�iUp��Sє���b��Zz^n�^�Dw،���-8����`&�]L<����YN�YAH�<ۭ���z$�@�_��;��|gZz���#o���œ�P�#�-v<�W"Q��x8�;\"��z�W]�N�����q���!-pt?�. e�����|��Sz����<z@h�LN<�K���G+�џ��?0S�	OBT}�ezX-EaKǉ<����5D�4��ѡ". e%���2V��f���,�h�_]V.�k�֣�5�>��߷�_Kx��t_~�^���t��xk�'$x��:��t���P2���~v8Mߩ��4r�:�K[��%�Tg�����B�
        {
            _cursorIds = cursorIds;
        }

        // protected methods
        protected override void WriteBody()
        {
            _buffer.WriteInt32(0); // reserved
            _buffer.WriteInt32(_cursorIds.Length);
            foreach (long cursorId in _cursorIds)
            {
                _buffer.WriteInt64(cursorId);
            }
        }
    }
}
