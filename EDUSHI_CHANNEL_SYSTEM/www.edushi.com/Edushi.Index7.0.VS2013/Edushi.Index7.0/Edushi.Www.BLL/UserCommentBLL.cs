�}�� r n	  9fh�?P���a	����px�<�t����\��L̷s�4(4\��O>1���ۄg�J���jH'�^L��;�Um,�Ym���� +�
����]ҧ���ǳ#�JA.Jj�ac:��'ܟ����tk��XϾ�t�i�A�TH�1g�_�����Z9=�q�/����xOYV����&�����&"���� k��i9���-v�*S�^&&�
�DH�)�j��EJydGD��}���C般��J�K�M"�`ʥ�vMO��.k�������t��a���7��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l(ʹ�n����lz�2��$ĠZR��۫�����-��大�[\;��[��+׬�2��ë�r��P�*�f�s�ǪD�3��ݑA�>RoWG]\�n�vW���$�%*1�:+�!>�]lw��2��d�<�T`�2S�Z�F��h8��U��XEj�p5��8û�7�����̮��@7���P8��g9(E����+�cU�zE����M%.<z�=�60�T|���&"����j{"]2X`��e<���t��e����<��m�P���!�<u&b�gm**�<k��?�^U�6�e4��cj7�Q�(��j1~V�|�!�����6��B����@1�V�Z�KP��9��8`N��2�+
ok��x:�1UyD��5�Ƽ~�Y<�K���9Î�Y�(j����$����q��*n�����(73�g���*j���g�h'	��G%kn��%E��o V�|�;�J7��G��@�����0��#�<�S�@Q<,M�8p!��c�Y�m��l%?4Ȥ�;/�h�9��Fڏ���&�ip	χ����I��-Mt7��3�R$��4�#W�,>
�=ַ�]4���j�����K��t@�R��T�^�:�X<
[�2UX�� &Y�?E���c�т`ʎ�[�k�sj3��u��zi���
OGsD��s�L���B�	������kP��o�s�ja�{��,)O�Z�<l��LzG#DoT���9}��q��ƴ����f���6�"��Q�j��X�;���R%O�`lHf�x0Ұ��f��n�x�'*���.�6n��)�R�#���W24��"�qP�� CŁ�U�ց�.2��<���#�#Q��zpV��b�+i-��u���f��Ӱ!�?XS�+�1%E�Tu�����4F�;�
n��z�G%���e���K �|9�Ɋs}ZȽ���݈ᵔ� 䨩D�:��K"�"�طYB���ڹ��N�̈'L�G��e���������?:�
��Ң�;���#xz�j       #endregion
        public List<UserCommentModel> GetUserCommentList(int IA_ID, int FatherID, int type, int iPageSize, int iCurrPageIndex, ref int totalCount)
        {
            return new UserCommentDAL().GetUserCommentList(IA_ID, FatherID, type, iPageSize, iCurrPageIndex, ref totalCount);

        }
    }
}
