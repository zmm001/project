�}�� r �  3�ը�K���a	����_>��}����qx��;�Wv�R�'�@��?J(����l�+�~���c{������vUIi	礰֮�����y^�vs�>��� �a��9	3j�wy�;����Pͭ����YV��0�l�����~>�X�Hhv]������X�����D�DX1�F���y �M�Az�E���M]��;	y-�F�+��8IN�g����3���>X�URXL�,R�uV��ĸ����_��鸴C��6(�eN-V$b��c����+w'��8-��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�)��|�0��'_�� `j�ސw0M�	s�Bk��"���c�7���Kf��)X<�齦y��O�G���M�����/��D���<���(��]}k��v3ra������R�[�$X+�Z�����=-�K��N����z��̊c�QI�VC8��4ntД��>����?����v�������1��&���R7�L�!��ʗ:~���'z��^��ơoh��s�]|��-M�����_뀋vYO�[�pS�~p�&��:�y4A^�4<̠!ȿ�ѵ�,�$���)i�Tv/+;�T6_�s\��VyUm~N������v�i�w\1#u2��7����aFH�0��Ϩ.��=AW
m�����m,�B�bך~N��+�0a*ƍ� ˼Н�*�F[eF�`��Zz����AA��\r�Ba4A/�|��z�&��LՓFQ��ÐR��Qjw9:`E<���$��;<���D�T�5.��(����~�m������ �$ߊ���޴��Ml�&^����N������Ȗ��Э�`�*
�x<�b9-���FKB����u��!1��r��f�P�(���8�\�}[���)-��w�P��j�M��]��%p�Ra���Jw]p��ƴ���_�<�� ����uR F�z������P��M�mJ��[���7bX5;��[+7�ґߞ�W��ZA��fײlW�{��9�(~�B��\��|���7��b|ZlZ�r�^��S�D��B�y�$���x��y�2yw�~���T�d�G.��0�/ܬ\�ꤱ/�tЙ�k}J�_q�vo�`�?Q.nywΆ�WT>�4��j�8��gyc )Qk��a�bA��[��c�g����F��(B��9A2N�DNb\)@�����ϑ?�\LSw7�4��M)7��Wߴ�U�,s���9�>�O"�.�p?�@�������B��ݰS�~'M��"0����&y#��	��"��St�s�07�N�e#.F�(�&,��ԣ�޴[`int iPageSize, int iPageIndex, out int iRecordCount, string sSqlWhere)
        {
            return _Dal.GetList(iPageSize, iPageIndex, out iRecordCount, sSqlWhere);
        }
        
        public DataTable GetUnionClaimList(int iPageSize, int iPageIndex, out int iRecordCount, string sSqlWhere)
        {
            return _Dal.GetUnionClaimList(iPageSize, iPageIndex, out iRecordCount, sSqlWhere);
        }
    }
}
