�}(� r �  ��9Bj`D��a	��
��_>�w|꯽*>������A*-FiDM3E�V�*��%eS�BN`�KRAv��68�����4FΗ���I�U
��#�+3a��kb`��\��`
�ñ��k��������k@�\��I�l�<�_
�I^���=�������̰�v�����i�u'�vA�f����\�㧊�]9+7�r�\��q�ӽTCZI��n�w8�CG�b�s5��+��PO/��o�� R��k�;��Ӷ9��O4�(�d����Ndv*��� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�%�U{�ݎ�L�]�w|��\��(M��~�Ǝ1�}u��v�(�u�!>�(˒�H�k�~�Gm��8o^.�!��c_��\&��e���{�eإ,&�-dǢ��u>�[�j:��2�Q��L��m�5�i?	Zl�F1��q6�ޒ,�5̉2_���5C�]�GIހW��a��#�7tuV��<��L���փ*'3'O�T��_��_J!`�8�J�,����Û/m��o�V����Z��r�R\�s��1a�pE�]��a&wF[5+5:�Tqi;�C�oS���~��Z���I�
�u��/�u�0��\QL���V�h�k�87������m��A1��g���(A���Y�e֒��[�pם��`.N=��ʭt�����r=�\����{���)����w��+[�.��[�����f��_��-p���B�Zy�/�1 �̯	t��D�ힻɺ���^}	�VE�Ψr�/)�M��}�>-(�����#R��N��Q�)?��0�i\Ĉ�表
         /// </summary>
         /// <returns></returns>
         public DataTable GetCityTable()
         {
             return _Dal.GetCityTable();
         }

          /// <summary>
        /// 获取对应城市名中的cityCode
        /// </summary>
        /// <param name="cityName"></param>
        /// <returns></returns>
         public string GetCityCode(string cityName)
         {
             return _Dal.GetCityCode(cityName);
         }
    }
}
