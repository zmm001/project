�}�� r �  '�o�?�<��a	���_���ꬩ>t8�ϻ�M�I�O���SIX�z���.QU�%���W8_vgza�9��5π�
u^ni.�\Bm�ai<�f~�G�M��mR�0[|],8��T��������Ù�q	����`��-L�{�X�h���U��w[% ���<�K���&R�}Ξ���|��&;B��\�*���>p���6`B��}B��#�ml�����#�����|����s�;���NoI%�\����!@ȫ���T^����A�.���؊g�o'fG[��6dM@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD!!���}(����C��%�RӾ�sҠ}��b�]#�,�8��	�࿜��C�Ā���4�fʜ��������C/+������ì��v�|sm1��������	�|IC��m�X��d�Man���9��������*D˲tXN�~��2��oų/�Z��fJ�,p������Y����͆At?,w�	��]��s_ɧ`�/�Z͡y	#��ݻ�-z�a5>猥����4Xy˓�b�m�c'�?�G��C3��*tX�rR����ʊ>S���j�'\��u�˺�h��!52A߷D+�2�]�O���.��@�@h�-�' �q�C�*>`�G��T�~���li�����%!�)�YV��~�n�8��N��J������t��q�A���(2Q�P��<s|A����mZ�^@L;�'�irL�E�q���R X��[4����N�a5������0��pm���w���b�����O�L�Y�C� k� ���X���N�ޘ�=A��Iޱ   MapDataProvideBLL _mapDataBLL = new MapDataProvideBLL(sCityCode, sLanguage);
            DataSet ds = _mapDataBLL.BDTDetailRecommendData(sCityCode);
            Response.Write(toxmlstring(ds));
            Response.End();
        }
    }
}