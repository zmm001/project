�}.� r �  IA�|�%���a	����^B��}�o�.�����U��B�yC�h%f�?|fU%sϼY�i/�#V�ѣ}�uW ���4��j�n��>ђ]wt	z�'ps��������$L�wS���[���b�C�Y�ž���ҧ�T|�+k ~o4����ރ���Uv(Yg�>���ߧP��:s2��5��G��Opzt7Hw��ߌ2Z�CKme���M��Y����3y�`aX����}F;>GM5]v���Ea�Cń��:D�ʜ�Ä8����G_���5y?� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD+�C���s1-�|��:���L��-WP���X	�J��ƕυN�#�Ų��`2g��h�&��hC�>�Ԁs��/U ��#�I��W�WVi>�;5jf����
'�m���R��i{�[,Q���gtc�U2P���Ӣ�1��z�w}��~��6�G֧E�HQ���?;�l
�"��3��
��-M�!S�_�=�����Xb��?�����d��)�ߛ���� k�\�zsO���Z�8;��q�6��*LU�>���1�-��4w5�c�.w�{�4,��p�B`��ѹ.�3b��S�j J��Y�j�-�z����*O�ɵ�rj�$��a�r���-�k�)@�m>����b�i �Q\:�!T�n��#�nP���T���l��ܴj�E#Bo֒�8d��C?�����£�Pt�ᬓ�J3s	�gv��ʸ��o�����/�ç���4��q�ߐm�&�t��X����;a��&54�6R֪�{2s��O��v���D��&G;�mr    public long GetReadRecordCount(int userId)
        {
            return new UserReadRecordDAL().GetReadRecordCount(userId);
        }

        public Novel_BookRackModel GetBookrackDetail(int NBR_ID)
        {
            return new UserBookrackDAL().GetBookrackDetail(NBR_ID);
        }

        public ReadingRecordModel GetReadRecordDetail(int NRR_ID)
        {
            return new UserReadRecordDAL().GetReadRecordDetail(NRR_ID);
        }
    }
}
