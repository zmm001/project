�}�� r p  �-��Tu���a	��	�+@N��}�l�.�|t�@��ّ�݈Wk��Mˑ�5�����P��A��+P�^UP��	�N��̈�c\l?ڭ��ܪ˖U��IТ�?$]�����Y��ZcP�����A�'�=oo����-/�蛵�K.
\�;nm�6�?m� I�r�[����C��AF��0ҳmIh$���,Tڑ�b\x�J�x
�˕:�!M�leu[=z���i��úg�`��v��cb�@�#*�A"����G+$�Įyh���8�2;iIi#a�V���� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l'��a�:!��w7�M�%K�?��ר��	�Z��f\��	G�i��P�)�9?q$X��(�:��_����<����eXS{Z)V�Dר�8V5�3M"��*O�a�k�5�ٵ��o��|P�X�\l�1�ӭ(#�p.CyVk�i�
Y�R(P��ۻ;ݎ�;�<��=荼t�]H����Z/��"iOx�!+��ۂX0�i�� ��/��W�y{Z�Qq�kV�p�;��V��Xs<M��9����d�n����wť{]b>d5J��̔)���q��8����3���1(
ML�SO�!��0Dn�^F� "���vӯa@��Wx7�<C�����au��"�ϗ�S�C�>WF���I��LS���UK���/d������_�������g�m��9�t�ꔫ7=��:u�I+�i%��;Y�bhC+n���c�AO����C�|v1���[����+N��Sߊ�O"�^���G�3\; �^�F}�$\��3o�X�Mӆ0�N�l� �\��;��y?u��fCp�.ެz��bQ�H�i��b�;�g�n����K�ZK�g`�l%^JE}CK�eǝ �ā���8)���LJ���������S� �;�Ϧ�+�"�H>��[_y�GL���!ro�
k�����������Z����������@�h��8�3�RWa�Çok�31��R5%螞0��g�OR��"�{�7R��������\|���(:H�O�_-��tsۑK����v�e-X�ݘl�#qT�s�	W{��e��`)^K=(�]�\� e���4ް@���i�������@H�͞�Q��ˇo���#y���^
�iC�Ӫ���
w��W�� X����]֬�]
�?�`��������1>�,�^t\�	����і��hr#&}�Z������<�z��C֖�v��12�d���{``:����#���Ӭ����]�=m\j�1���&���rO�'O����.-�����Ʌ��l '4�	w6�u�2/KqI��4|�BLt]���10�S���F�)���
��f���?��f������h�l�es�x�0��Bufq�����=	n��^a��9�w����|�gz1�6চ� ���u��*����~��w$�4�{AR��*�L$����]��c��ta��c��6����pJ??����1 j�щ�*Ve�?�ъ�p��Pk@��a�o�6����rZ�k�Zl��ιW���.�҉Z (����4E�lH9��<\@���*(�˨kcAB��y�z��R\T���NΈ�}
�$��(�Fa�I�g�E�|���:D(�^����v��lok�K��~j�92A�q�!c$T_�9c�p��1(㴀�rl�9&�P�K�ԅ l����gE �5G�Sv�9�a��]I�zH�&d��`�U�T��D��O2�������h��LGɗ$iӧQ�^5����?�/�=c��Ʀ/�W7�������zak��i���>u��dl�.�	j�uG�-����[t1F�-"�qϹtT�)
��?:�V�.R� �l�ڄT��O"_�wԣ*�E����߲"�I�0�^*����=)�>�L�d�ɺ���������*�`����58�GM��K%o�Y���pP��~>����d�
.k�5�����̝��l1УȪ3C�������&�"���-���7q<�l�'+� �M��[X�U�-Gd�*��?�P������.�P��jМ[���3%D��,+?M	r�����N��0A�n��.�>RѺ�!|��i�|����]��7��X
�)=
��2얪%+��Zx�Д+^�'�L�Rwq&C$_������-�zxzʤ��N��[a��� a�Uc�19�Y�*�F��ff����Eq�V� uG�Y��\�a�>���ǈ*�?�b���m�(�j��f��G�g�o�+<V�4���+��/��z��leK̦�$���;ڴ�D�
�*L�ap�{��U��c��$�rs List<List<ModelHouse>>;
            }
            else
            {
                return new BllHouseList(OwnerID, this.CityCode).GetListModel();
            }
        }
        #endregion
        protected int OwnerID
        {
            get
            {
                return SafeRequest("ID", 0); //（有酒店评论的）164340  家乐福 45070
            }
        }
    }
}
