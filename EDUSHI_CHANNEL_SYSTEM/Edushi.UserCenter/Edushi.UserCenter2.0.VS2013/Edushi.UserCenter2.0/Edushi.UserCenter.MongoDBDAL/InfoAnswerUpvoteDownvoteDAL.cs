�}W� r   �&^��t��a	����_B��}�o�.��d����fQ�z��.�Tk��X�MX��O��?��WZ��Q�����'�C�5���	i�Y�Ь�	X������"i��-�F�"�$tT�<S��gZ�ox(r����N(:�$�2!Ri.p��FL��ۦH>b���б�8��
���YYm��:���ަ�b�a��<4a�ϑ	��a����]?�窯��f������~<��HG9]����s6��%"�7e+��\��hͷ|e���#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l*|=:_OМ�*�.����m�"/���
�h���=a�A�Q�]>%S&��?H�a] �"�^�,b��2;"��[���;q���$�$C����S)ޗ�aN���`��m� 
�s�;�'�.��j�������z�2ª��z瘋h����N!�F�j���+6��{kfo���%F��$6�ad�Z�+�0s��fVsݕ�m�B�q�)\	1m��4e ��ᗠtZ��n� �F�A5�.ɧ���mg;Jv;s��
(������0��J8|�t48�š5m��;+ ڔp�.�=�<౏75��0��S�ҡ�[�����E��f��M�9�'o�H䋙ׇ+Q����R�(���OSR��	7�wM��t� [�B*�>�	��m�f�z2 ǳY3�S(�_�>�B��T<>o����:^�7�D�by���9�\�,�!m���Ţ��Cr(���E�W q���+�º1UX��e�5�w�k����=���2��InfoAnswerUpvoteDownvoteModel>();
            }
            SortByDocument sort = new SortByDocument { { "IAUD_CreateDate", -1 } };

            var query = new QueryDocument { { "IAUD_UserID", userId }, { "IAUD_Action", 1 } };

            return _mongoCollection.FindAs<InfoAnswerUpvoteDownvoteModel>(query).SetSortOrder(sort).ToList();
        } 
        #endregion
    }
}
