�}�� r �  ʘDa�?F��a	���_�����:t8�ϻ�M��]�V�#�%�)�F�_�[OB&!���ܥ��G���y��x�F�q��A��4���'�
����]���F]�u~s���u�P�	��\JJ�u��a����Њ�c�K�*G~"������jd/۲R�.i�/�qz0���@�גU�����X�;����ژk�X�z D�����К�X����f!tq�s[�j� ah��p�%�#8{�9d��pL�+����-�6�iO�;I��TLy��U^�'k�<ʞ��x�d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l!Jw�7��J>�h���Ѵw�O1�i�u��"�<����3~ND���Q��I�=T�5��ܪ��_��TH�7X+��P�%����Gi-�x8�'SNϴ���H�t��)�)c���:�~0�)�h�j �v�a�X���5Br�q��4�T��#�+��G�=��e&0Z%�=���(��$'��ߚ�m<�=:S�^�U����f��la��Рv�V80�Jԓh������I4R=������|Q� ��	_Ϸ��5_[�E��5�Zy�fӂ�^;@��=y�������l�5*�{/���N��_�.�S%}��B@�.I���c��_�J��ћPB\�K�ָQg�1?׵t�X���!aܗ��d�HBam�b\A+�
g��։�>=�eʯ�3��b�,v�mU��n�#H4�7S-Ƣʸ�ɗ�F�/��v�[္��~��)�ɳƠ�[}�ވ]ftն����O���%����g���>|X��#[�l�w�DataProvideBLL _mapDataBLL = new MapDataProvideBLL(sCityCode, sLanguage);
            DataSet ds = _mapDataBLL.MapDetailRecommendData(sCityCode);
            Response.Write(toxmlstring(ds));
            Response.End();
        }
    }
}