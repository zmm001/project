�}J� r /  �.'_ym��a	��� ��^���}���*2�?.�
W���M�5�'(����-�a�3�.���q|[ޤe�L�l�}���"��~` �y�V�i��Q����^��6cѕn�أ<�P���$I����n���Q&6)�����m�mx嵫4t*a��R�l���z���4ik��l�Om�t���fՒ��a�z!>k֦S���yƜ�=T�b��V!gpl�|	�p�� L�S�-4N�an���ȺF��[�)�6��CY�i�b#� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�%�U����asI�R\���Ɂ�f!X{�/T-u[%
	M@X���d���5sT�<������r�,��Щ�0~�N��V� kkq�:gB�t�i��۝�hn��e�.��o'[|�AA^��``UXS�np�w��O*����<Qk	��>-��U��nݧq�zjX7V��<���F ��C��]��xt`Is	���Y��&qYf{��J�|[뒫M��{,��~��ڈ�X�	�|�_(�1��p{�W�c��QgAAq5+5:�Tqi`�i�oS���*�L1����l��
j��d�f��Dbs��N�)�\�7���b�Ņ���>��	}F��gс�f1Y���V6�pR���	E�Zם��`.N=����K�{�*^Y*��A�~�R�WN�g24��j�[�.��[�����f��_��-p���B�Zy�/�1 �̯	t��D�ힻɺ���^}	�VE�Ψr�/)�M��}�>-(�����#R��N��Q�)Ҿ�09h\�{0}images/", skinPath);
                if (File.Exists(filePath))
                {
                    StringBuilder style = new StringBuilder();
                    style.Append(Tools.ReadFileByGb2312(filePath));
                    style.Replace("images/", imagesPath);
                    Response.Write(style);
                }
            }
        }
    }
}
