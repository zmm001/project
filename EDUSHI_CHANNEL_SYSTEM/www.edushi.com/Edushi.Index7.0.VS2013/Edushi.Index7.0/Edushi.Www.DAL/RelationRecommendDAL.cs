�}�� r �	  7�=���yd��a	���#@���}�����
��AQ�E�cI-�$�o�/|q�2�WQ&�q���M"5�v9l�� eV"��cG���7�>y0F����#7;���0���t ��Af��9�*s��%@�9��/���j��+�=7Z�b��^ߒ��>%�����R5����-N��/�ʴ��,�s������� �%������ )���5?�z�W����2��C(j,��7����cs�_\`��{�,ݜ7����xJ��ȵ�,�]Nm�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�'X��
Ozt�ƈ�����Z>yٮ28=V2�̳?���p� �q8�ooRv���F�|�G�Cj�~;["a�9�W��v�Z�z��gJ+k��u|�q�'G�Y�S7�d�P*��6�t>���"���di�x菠��^�R�~I��_Q�RZ�_��c��9s���u/�r�ʢ)5����{Fz4�k�Vx��f��Ut*�PH
�Ŀ�;;���ξ��X�?�8�R��P苢�L�4Aէ94���,�l���.f�v` *�I���$ʟ{���q;�#<�В���lJ6X1��a
]=c1/��F�eE^h�*��F�Y�{��sf|�T?����C�i~q4��o�;� X���Q�m�f!%��2�jd��w�!!g���3�F��9��������^��b�g~�z��9�o�b.!�Ndt�I�gy�n���\�1�a����s�Ѵ`��,��p��Ël�T�$Ӳ{{���5p{�vbq��?�s��%���s1��<A�odel>();
            }
            QueryDocument query = new QueryDocument();
            query.Add("RR_IA_ID", IA_ID);

            return _mongoCollection.FindAs<RelationRecommendModel>(query).SetSortOrder(sort).ToList();
        }
        #endregion
    }
}
