�}�� r B
  �YgVS�����a	����_���}ꬱ��|6,�_�~��y�M���ӿ�9_�'ں�c|sU<�E���5���q�ѐn%SC�L!���/|p��a���CƇ2%��αR(G��Hؾ�|2\Y�Q��x+�d5��$�,������W�$��_]��_�k}_|u~�����z6��BPT
a�5P<���:. x�Q�e�
s��M���El)m�M'~�)�	�vV��j�L ɋ�d�}��@�!Z�%-���۴cf�!ҡr�o�^�U� ���H�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD[.���������|�ꊢ�Y�S��ri|s�n��z�dБ!7�g�6�!�yu����&ٙ�%�gVR��N�Mҍ�I�[ɴ��pW�����*.�kꟾ~-��K�mZr�d���z�g�s�G�7C��uH��ӧn��c!EѪN\��M]�G������y��bC�{<�v8>�}���J�n�����]�V�)�fr�nXUN�$nP��x$;�d�9C�T�gGH.5h>���.pD�O�YEG��'���E�C������)�<�³Hv��f|�ၼ��e���2���)Ё&
6>*�M�t������+g��.�s�(�;��>rL߫f�-�3"���(���D
���V�!Ǖx�F>撶ά/j��9��pI݇2��}��,ͣ<֣)�����E���^v%�z��B�L�ub��`��"ؾ�~��c��7e,�m�o@郌t9��:{C��Y��W~$�U��.K��h]]�x�ͦ����PgE��8ɒ� �<�      }

        public void getCacheKeys()
        {
            string html = string.Empty;
            foreach (var element in cache)
            {
                html += element.Key + "<br />";
            }

            Response.Clear();
            Response.ContentType = "text/html";
            Response.Charset = "UTF-8";
            Response.Write(html);
        }
    }
}
