�}�� r ]  �}:�Ny���a	��W��_���}�n��S
���爭aA�Cyqp��%��G��~��u���ۍ\3�Sw	46��k�ٷ���&K�m�K}�5[S���+��gI�`�=�t�k��^��9\�ں�jj��\ԕ�^�J5抨]�5:��_M��� ���j�T2f�������&%c�Ee#Λm���j �̋����r@��)/����_<��$���I�X4IVR6�Z�Z+�*q��C�{�y�x�+:�Xg�\M�����&u��sו���}�bŰ����c�x֋�I{��Gm�,"{���Q����܅��w}�Vo�Rfuޤh���6o�S��.7�.�O�hh�;Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�)��r\�Oj.A�f��f��ǐ��z����g'L�����b��Qؓ���1
Q�/���ظ1�׹ش�a��l_����7���睋E���ɓ�/u�����)lIH����
����i�vC�7>�h����3Aߟ{�sCF�U�?����S����A���)��X��F�o��.�Ǐ�!g���;)���ĉ�9\&���VF��=ٻ��444rV�6��\YO��2�2p�g��%�h(_�lh��D���ʣ�*�/���b�Tl>j=�*6:�n�
=�VyUmqA�����I�7�0�]\1#u`�L�j���iD�Z(����څoq?m(������RT�'�b��=��w�a6���m�� �I0�!ˀK_��m��b%�R�ڮ���|�&��[_��LՓFQ��ÐR��Qjw9:`E<���$��;<���D�T�5.��(����~�m������ �$ߊ������Ml�&5��>�;�ۗ�3�ތ�.�k�X�ʲK#m���b[��0�l�ó�@��6l� ̐��LG/��<t���4����˔��'��F�C�����U����ff����޾ކ�̆2C�i��m�BO=��%������^�ց���*Wz���^� <�k����J.V����%����M5u^��q�������o��lҠ�x��~B@�Y���W��!J-�j���3�k�a���Rl|�oC{�Ԡx	Qa�)P*�Q��ȟj���.�������d��i�k���Yq��sR�/fړёŬb쯡~���$�{����+f��k��[K{����f�%:jL��y�na.�o�N�w�N�X��WJfz}iL9q����Т~�ݸ����՛G��#�	Q��'��<M?/��K�9��z�fq�b�_z��HC�T<��yx�_�9F�1����5��H����ọ��]�Lb;�����F���y|�.=yplڃ���lD'�G��P��o��*��X�O*=Ӡ�#Gb#u	��kQ?���2o_0��m��M��)�^Do���i��A��Y8�6����-|aO<��p�&�2�\���Ȩ��:"dyŎ����އ~�՚���1~�;����̀W��4�b�y�R�nK/��,>r�c�5�҆��9%����A"���(�����ʓ�Qў֌���,�#N6�7��j��7���g���Ċ��gYF�D�U��1�A�bè�Dj,�Gs�R��s"�{���K-z���́�=q���Q�C�)�h"�#��S����������X���l�&��ntQ��8���3Ҹ�f�e��#hw�]��� q�®��*� ��'0���.�G��_�$+�~uW��,�ޯ<�����9?Ɛ-�ݾ����ƻI���R_��;B��4P8�����j�~��̎��.�� �0����8�o�a�^ﶌۏT�fW�W��(�SՁ_���mq#@�$i_�M9tra elements member.</returns>
        public string FindExtraElementsMember(Type type)
        {
            var memberInfo = type.GetMember(Name).SingleOrDefault(x => x.MemberType == MemberTypes.Field || x.MemberType == MemberTypes.Property);
            return (memberInfo != null) ? Name : null;
        }
    }
}
