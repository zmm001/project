�}l� r S  -�P,��a	��W��_���}�n��S
���爭aA�Cyqp��%��G��~��u���ۍ\3�Sw	46��k�ٷ���&K�m�K}�5[S���+��gI�`�=�t�k��^��9\�ں�jj��\ԕ�^�J5抨]�5:��_M��� ���j�T2f�������&%c�Ee#Λm���j �̋����r@��)/����_<��$���I�X4IVR6�Z�Z+�*q��C�{�y�x�+:�Xg�\M�����&u��sו���}�bŰ����c�x֋�I{��Gm�,"{���Q����܅��w}�Vo�Rfuޤh���6o�S��.7�.�O�hh�;Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�,na]0i�Ϋ�뿩�#�?�c���tr�,(C�;P{���t��F/(_�������*�H�
�+�>���x����U�@+�Y��P_�V��߄��?>N��C���}���<����f ��G���%.1�߸i��txe�i�ȅ�Z1�R^�o����C��2��:I~l�cc	WL��r�� A�I�$��a'@)H^<�򾪩M%"衈��U�h�L,�+:,�-63[�**Z'B�\��d���G�����L儋���-.��� Qڏ>��'��^s�XĚ������c4Z螝�X~X��{�"o���))g%�'������D����8c�������@���4�B	z�y%b����`�aM��86!$y�DBk��m;m�����j��Jy�y��\����ۀD��=�R�c�Dys�n�_�C=)j�^�
�Qy��b�j
��EaMvJEL\Md���K��TY��RL\�WzSf�M��	?c���CH�HNlD%T����D��(`���;e��oP阋<W/xm,S�T�A�[�����ʆ�[�J+>yF�^�Dh��V�N�i��vR��U������0���Az�O�VƇP;�2_������)�{�<�$J�,Y9*$A���=V�ꗚ�����\Kʸȷs����d��C�? �C�k%YV8�n��@;��s��M�8)��8X��D�Bm�GĞ�<�:N"�0w��*Q�hf��Yb�(|ğ��ݟ+4����P��؀�o�����E����^�A�5�?�N?�U ��*��=q��-�]l��y���\Wk�F�8$�>6��1�=?ٕ�o� ;�0L7렍$��>(v�٫�р���c�Y�o��9}U�+F��
e����}�<��&�����p��1��c�asŢ�魜{i`����f?���������/�<��[1�y���2[ERш/� u	���}#<��ڧ����vZ��(,�ˎs�)p\K���ɖ���)ϲ4��be ignored when serializing this class.</param>
        public BsonIgnoreIfDefaultAttribute(bool value)
        {
            _value = value;
        }

        // public properties
        /// <summary>
        /// Gets whether a field or property equal to the default value should be ignored when serializing this class.
        /// </summary>
        public bool Value
        {
            get { return _value; }
        }
    }
}
